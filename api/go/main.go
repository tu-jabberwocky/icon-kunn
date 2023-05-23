package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/ant0ine/go-json-rest/rest"
)

type response struct {
	text string `json:text`
}

func main() {
	api := rest.NewApi()
	api.Use(rest.DefaultDevStack...)
	router, err := rest.MakeRouter(
		rest.Get("/get", GetIcon),
		// rest.Post("/countries", PostCountry),
		// rest.Get("/countries/:code", GetCountry),
		// rest.Delete("/countries/:code", DeleteCountry),
	)
	if err != nil {
		log.Fatal(err)
	}
	api.SetApp(router)
	log.Fatal(http.ListenAndServe(":8080", api.MakeHandler()))
}

var lock = sync.RWMutex{}

func GetIcon(w rest.ResponseWriter, r *rest.Request) {
	lock.RLock()
	w.WriteJson(map[string]string{"Body": "He110 w0r1:D"})
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	lock.RUnlock()
}
