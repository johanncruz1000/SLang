#!/bin/bash
USERPATH="$PWD"
echo "compiling..."
if [ -z "$1" ]; then
echo "ERROR : input file missing!"
echo "writing example:  slang inputfile.sl outputfile"
exit 1
elif [ -z "$2" ]; then
echo "Warning: Output file missing, your output file will be named 'output'."
OUTPUTFILE="output"
else
node "$(cd "$(dirname "$0")" && pwd)/compiler.js" "$USERPATH/$1" "$USERPATH/$2" "$3"
fi
