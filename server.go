package main

import (
	"flag"
	"log"
	"net/http"
	"strings"
)

// FileSystem custom file system handler
type FileSystem struct {
	fs http.FileSystem
}

// Open opens file
func (fs FileSystem) Open(path string) (http.File, error) {
	f, err := fs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, _ := f.Stat()
	if s.IsDir() {
		index := strings.TrimSuffix(path, "/") + "/index.html"
		if _, err := fs.fs.Open(index); err != nil {
			return nil, err
		}
	}

	return f, nil
}

func main() {
	port := flag.String("p", "8080", "port to serve on")
	directory := flag.String("d", ".", "the directory of static file to host")
	flag.Parse()

	fileServer := http.FileServer(FileSystem{http.Dir(*directory)})
	http.Handle("/", fileServer)

	log.Printf("Serving %s on HTTP port: %s\n", *directory, *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}

// import (
// 	"html/template"
// 	"net/http"
// )
//
// func main() {
// 	http.HandleFunc("/", func(w http.ResponseWriter, _ *http.Request) {
// 		t, err := template.ParseFiles("frontend/build/index.html")
// 		if err != nil {
// 			panic(err)
// 		}
// 		w.Header().Set("Access-Control-Allow-Origin", "bitbucket.org")
// 		t.Execute(w, nil)
// 	})
// 	println("Listening on port: 8080")
// 	http.ListenAndServe(":8080", nil)
// }
