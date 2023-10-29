Bun.serve({
    port: 8080,
    hostname: "localhost",
    async fetch(req : Request) {
        const url = new URL(req.url);
        const method : string = req.method
        
        if (url.pathname === "/") {
            return new Response(JSON.stringify(req.headers)+ '\n')
        }
        if (url.pathname === "/html") {
            return new Response(`
            <p>serving requested page</p>`,{
                headers: {
                    "Content-Type": "text/html",
                  },
            }
            )
        }

        if(url.pathname === "/page"){
           
            if(method == "POST"){
                if(req.body !== null ){
                    const req_body = await req.json();
                    console.log(req_body);
                    return new Response(JSON.stringify({statusCode:200,message : `${req_body.inputOne} successfully inserted`})+ `\n`)
                }
                                        
              
                return new Response(JSON.stringify(req)+ '\n')
            }else{
                return new Response(Bun.file('./form.html'),{
                    headers: {
                        "Content-Type": "text/html",
                      },
                })
            }
         
        }
        else{
            throw new Error("woops!");
        }
    },
  });

