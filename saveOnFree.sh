#!/bin/bash -f
# recopie les fichiers myne.html et script.js sur free non protege

echo -n "pasword pour acceder a free ? "
read -s passwd
echo ""

chai="quote USER adajc
quote PASS "$passwd" 
put myne.html
put script.js
quit
"
ftp -i -n ftpperso.free.fr <<EOF
$chai
EOF
