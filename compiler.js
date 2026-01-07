const {exec}=require('child_process')
const args=process.argv.slice(2);
const fs=require("fs");
var code=fs.readFileSync(args[0],'utf-8')

code=`void print(std::string a){std::cout << a;} std::string input(){std::string a; std::getline(std::cin,a); return a;} int Int(std::string a){return std::stoi(a);} int main(){ ${code} }`
if(code.includes("print")) code=`#include <iostream>\n#include <string>\n#include <any>\n ${code}`
code=code.split("\n").join(";\n").replace(/;;/g,";").replace(/  /g,"").replace(/};/g,"}").replace(/{;/g,"{").replace(/{ ;/g,"{").replace(/\n;/g,"\n").replace(/>;/g,">")
console.log(code)
function detect(codigo) {
    return codigo.replace(/^var\s+(\w+)\s*=\s*(.+?)(?=;|\n|$)/gm, (match, nome, valor) => {
console.log(valor);
if(/^-?\d+$/g.test(valor) && !valor.includes(`"`)){console.log(`${nome} é int com o valor ${valor}`)}
if(/(-?\d*\.\d+)/g.test(valor) && !valor.includes(`"`)){console.log(`${nome} é double com valor de ${valor}`)}
if(valor == "true" || valor == "false"){console.log(`${nome} é bool com o valor ${valor}`)}
if(valor.includes(`"`)) {console.log(nome+" é string com valor "+ valor);
 }
});
}
detect(code)

exec(`cat > ${args[0].replace(".tl",".cpp")} << 'EOF'\n${code}\nEOF`)
exec(`clang++ ${args[0].replace(".tl",".cpp")} -O3 -o ${args[1]}`)
//*/
