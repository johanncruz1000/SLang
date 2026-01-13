#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <fstream>
#include <filesystem>
#include <regex>
#include <cstdlib>
#include <sstream>
class var{
private:
using VAR1_NAME = std::variant<int, double, std::string, bool>;
VAR1_NAME value;
struct TOINTVAR {
int operator()(int x) { return x; }
int operator()(double x) { return static_cast<int>(x); }
int operator()(const std::string& x) {
return x.size();
}
int operator()(bool x) {
return x ? 1 : 0;
}
};
public:
var() : value(0){}
var(int x) : value(x){}
int ToInt() {
return std::visit(TOINTVAR{},value);
}
operator int() {
return ToInt();
}
bool operator<(int limite){
return ToInt()<limite;
}
var& operator++(){
if(std::holds_alternative<int>(value)){
int& val=std::get<int>(value);
val+=1;
 }

return *this;
}
var operator++(int){
var temp = *this;
++(*this);
return temp;
}
var& operator--(){
if(std::holds_alternative<int>(value)){
int& val=std::get<int>(value);
val-=1;
 }

return *this;
}
var operator--(int){
var temp = *this;
--(*this);
return temp;
}
var operator+=(int valor){
if(std::holds_alternative<int>(value)){
int& val=std::get<int>(value);
val+=valor;
  }
return *this;
 }
var operator-=(int valor){
if(std::holds_alternative<int>(value)){
int& val=std::get<int>(value);
val-=valor;
  }
return *this;
}

};
template<typename... Args>
void print(Args&&... args){
std::ostringstream value;
value << std::boolalpha;
(value << ... << std::forward<Args>(args));
std::string a = value.str();
std::cout << a << std::endl;
}
template<typename T>std::string String(T a){
std::ostringstream value;
value << a;
return value.str();
}
