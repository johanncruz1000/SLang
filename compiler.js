const {exec}=require('child_process')
const {promisify}=require("util");
const execAsync=promisify(exec);
const args=process.argv;
const fs=require("fs");
var code=fs.readFileSync(args[2],'utf-8')

code=`void print(std::string a){std::cout << a;} std::string input(){std::string a; std::getline(std::cin,a); return a;} int Int(std::string a){return std::stoi(a);} int main(){ \n${code}\n}`
if(code.includes("print")) code=`#include <iostream>\n#include <string>\nusing string=std::string;\n ${code}`
code=code.split("\n").join(";\n").replace(/;;/g,";").replace(/  /g,"").replace(/};/g,"}").replace(/{;/g,"{").replace(/{ ;/g,"{").replace(/\n;/g,"\n").replace(/>;/g,">")
//console.log(code)
function detect(codigo) {
    return codigo.replace(/(?<!["\/])var\s+(\w+)\s*=\s*(.+?)(?=;|\n|$)/gm, (match, nome, valor) => {
if(/^-?\d+$/g.test(valor) && !valor.includes(`"`)){code=code.replace(`var ${nome}`,`int ${nome}`); console.log(code)}
if(/(-?\d*\.\d+)/g.test(valor) && !valor.includes(`"`)){code=code.replace(`var ${nome}`,`double ${nome}`)}
if(valor == "true" || valor == "false"){code=code.replace(`var ${nome}`,`bool ${nome}`)}
if(valor.includes(`"`)) {
code=code.replace(`var ${nome}`,`string ${nome}`)
 }
});
}
detect(code)

exec(`cat > ${args[2].replace(".sl",".cpp")} << 'EOF'\n${code}\nEOF`)
execAsync(`clang++ ${args[2].replace(".sl",".cpp")} -O3 -o ${args[3]}`).then(()=>{
if(args[4]=="-emit-cpp"){
}else{
exec(`rm ${args[2].replace(".sl",".cpp")}`)
}
})
//*/
