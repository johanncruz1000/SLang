#include <iostream>
#include <string>
void printl(std::string a){
std::cout << a << std::endl;
}
template<typename T>std::string String(T a){
return std::to_string(a);
}
