@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo   Envoi de SABLE sur GitHub
echo ============================================
echo.

for /f "usebackq tokens=*" %%i in (`git rev-parse --abbrev-ref HEAD`) do set "BR=%%i"
set "REPORTE="

git add -A

git diff --cached --quiet
if errorlevel 1 goto commit

echo Aucun changement dans les fichiers.
echo On regarde s'il reste des commits a publier.
echo.
goto branche

:commit
echo Fichiers qui vont etre envoyes :
git diff --cached --name-status
echo.

set "msg="
set /p "msg=Message du commit (Entree = 'Update') : "
if "%msg%"=="" set "msg=Update"

echo.
git commit -m "%msg%"
if errorlevel 1 (
  echo.
  echo ***  Le commit a echoue. Rien n'a ete envoye.  ***
  echo.
  pause
  exit /b 1
)

:branche
REM Le site ne sert QUE main. Pousser une autre branche marcherait sans erreur
REM et ne changerait rien en ligne : un faux succes, le pire des resultats.
if /i "%BR%"=="main" goto publier

echo Tu es sur la branche "%BR%", et le site en ligne ne sert que "main".
echo.
set "rep="
set /p "rep=Reporter "%BR%" sur main et publier ? (Entree = oui, n = non) : "
if /i "%rep%"=="n" goto annule

echo.
git checkout main
if errorlevel 1 (
  echo.
  echo ***  Impossible de passer sur main. Rien n'a ete envoye.  ***
  echo.
  pause
  exit /b 1
)

REM Avance directe seulement : si main a des commits que la branche n'a pas,
REM on s'arrete au lieu de fabriquer une fusion dans le dos.
git merge --ff-only "%BR%"
if errorlevel 1 (
  echo.
  echo ***  Avance directe impossible.  ***
  echo   main a des commits que "%BR%" n'a pas. A regler a la main.
  echo   Rien n'a ete envoye.
  echo.
  git checkout "%BR%"
  pause
  exit /b 1
)
set "REPORTE=1"

:publier
for /f "usebackq tokens=*" %%i in (`git rev-list --count origin/main..main`) do set "AVANCE=%%i"
if not "%AVANCE%"=="0" goto pousser

echo Rien de nouveau a publier : main est deja sur GitHub.
echo   https://dartois.studio/Sable/index-desktop.html
echo.
pause
exit /b 0

:pousser
echo.
echo %AVANCE% commit(s) a envoyer.
git push
if errorlevel 1 (
  echo.
  echo ***  Une erreur est survenue pendant le push.  ***
  echo.
  pause
  exit /b 1
)

echo.
echo ---------------------------------------------
echo   Envoye. GitHub reconstruit le site tout seul.
echo ---------------------------------------------
echo.
if defined REPORTE echo Tu es maintenant sur main. La branche "%BR%" lui est identique :
if defined REPORTE echo   git branch -d "%BR%"   la supprime, sans rien perdre.
if defined REPORTE echo.

REM Si l'outil GitHub est installe, on attend la publication et on le dit.
REM Sinon on s'arrete la : la publication se fait quand meme, en silence.
where gh >nul 2>nul
if errorlevel 1 (
  echo Le site sera a jour dans une minute environ :
  echo   https://dartois.studio/Sable/index-desktop.html
  echo.
  pause
  exit /b 0
)

echo Publication en cours, patiente...
echo.

REM On attend la publication de CE commit precisement. Prendre simplement la
REM plus recente annoncerait un faux succes en repechant celle d'avant.
for /f "usebackq tokens=*" %%i in (`git rev-parse HEAD`) do set "SHA=%%i"
set "RUNID="
set "ESSAIS=0"

:attente
for /f "usebackq tokens=*" %%i in (`gh run list --commit %SHA% --limit 1 --json databaseId --jq ".[0].databaseId"`) do set "RUNID=%%i"
if not "%RUNID%"=="" goto trouve
set /a ESSAIS+=1
if %ESSAIS% lss 12 (
  timeout /t 5 >nul
  goto attente
)

echo Impossible de retrouver la publication en cours. Verifie l'onglet Actions.
echo.
pause
exit /b 0

:trouve

gh run watch %RUNID% --exit-status >nul
if errorlevel 1 (
  echo.
  echo ***  La publication a echoue : le site en ligne n'a PAS change.  ***
  echo   Pour voir pourquoi : gh run view %RUNID% --log-failed
  echo.
  pause
  exit /b 1
)

echo.
echo ---------------------------------------------
echo   C'est en ligne.
echo   Bureau : https://dartois.studio/Sable/index-desktop.html
echo   Mobile : https://dartois.studio/Sable/
echo.
echo   La surcouche bureau (desktop-v2.css / .js) n'a pas de numero de
echo   version dans son adresse : au premier coup d'oeil, recharger avec
echo   Ctrl+Maj+R pour ne pas juger l'ancienne version.
echo ---------------------------------------------
echo.
pause
exit /b 0

:annule
echo.
echo Rien n'a ete envoye. Tu es toujours sur "%BR%".
echo.
pause
exit /b 0
