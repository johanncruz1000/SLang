func int fib(int n){

if(n <= 1){ 
return n;
}else{
return fib(n-1) + fib(n-2)
}

}
print(String(fib(10)))
 
