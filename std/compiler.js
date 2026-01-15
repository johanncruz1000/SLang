const {exec}=require('child_process')
const {promisify}=require("util");
const execAsync=promisify(exec);
const args=process.argv;
const fs=require("fs");
const path=require("path");
var code=fs.readFileSync(args[2],'utf-8')
var setup=fs.readFileSync(path.join(__dirname,"setup.cpp"),'utf8')
var variaveis=[];

code=`//#include "${__dirname}/var.cpp"\nstd::string input(){std::string a; std::getline(std::cin,a); return a;} int Int(std::string a){return std::stoi(a);} \nint main(){ \n${code}\nreturn 0;\n}`
code=code.split("\n").join(";\n").replace(/;;/g,";").replace(/  /g,"").replace(/(for|if|while|else\s+if|else)\s*(.*?)};/g,"$1 $2 }").replace(/{;/g,"{").replace(/{ ;/g,"{").replace(/\n;/g,"\n").replace(/#include\s+<(.*?)>;/g,"#include <$1>").replace(/template(.*?)>;/g,"template $1>").replace(/:;/g,":")
code = code.replace(/(for|if|while|else\s+if|else)\s*(?:\((.*?)\))?\s*\{(.*?)\}/gs, 
    (match, tipo, condicao, conteudo) => {
        if (tipo === "else") {
            return `else OPENING_BRACE ${conteudo} CLOSING_BRACE`;
        } else {
            return `${tipo}(${condicao}) OPENING_BRACE ${conteudo} CLOSING_BRACE`;
        }
    }
);
code.replace(/import\s*(<|")(.*?)(>|")/g,(match,start,name,end)=>{
code=code.replace(`import ${start}${name}${end}`,``)
if(name.includes(".sl")){
code=fs.readFileSync(name,'utf-8')+code;
}else{
code=`#include ${start}${name}${end}\n${code}`
}
})
code=code.replace(/int\s+main\((.*?)\){(.*?)func\s+(.*?)\s+((.*?))\((.*?)\)\{(.*?)\}(.*?)\}/gs,"$3 $4($6){$7} int main($1){$2 $8}");
code=code.replace(/CLOSING_BRACE/g,"}")
code=code.replace(/OPENING_BRACE/g,"{")
//console.log(code)
function detect(codigo) {
    return codigo.replace(/(?<!["\/]|\busing\b\s+)var\s+(\w+)\s*=\s*(.+?)(?=;|\n|$)/gm, (match, nome, valor) => {
variaveis.push(nome);
//getVar();
})
}

detect(code)
code=setup+code;
exec(`cat > ${args[2].replace(".sl",".cpp")} << 'EOF'\n${code}\nEOF`)
execAsync(`clang++ ${args[2].replace(".sl",".cpp")} -O0 -o ${args[3]}`).then(()=>{
if(args[4]=="-emit-cpp"){
}else{
exec(`rm ${args[2].replace(".sl",".cpp")}`)
}
})
//*/
