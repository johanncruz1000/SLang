#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <fstream>
#include <filesystem>
#include <regex>
#include <cstdlib>
#include <sstream>

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
