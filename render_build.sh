# #!/usr/bin/env bash
# # exit on error
# set -o errexit

# npm install
# npm run build

# pipenv install

# pipenv run upgrade

#!/usr/bin/env bash
# exit on error
set -o errexit

# Asegurar permisos correctos
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod +x src/wsgi.py

# Continuar con la instalación de dependencias y construcción
npm install
npm run build

pipenv install

pipenv run upgrade
