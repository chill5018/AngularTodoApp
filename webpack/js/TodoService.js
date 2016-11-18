// Allows us to inject a dependencu into a module that is not a component
import {Inject} from 'angular2/core'
import {Http, Headers} from 'angular2/http'

// Allows us to map the HTTP respone from raw to JSON formate
import 'rxjs/add/operator/map'

class TodoService {
  constructor(http) {
    this.http = http
  }
  getAllTodos() {
    return this.http.get('/todos')
      .map((res) => {
        return JSON.parse(res._body)
      })
  }

  postNewTodo(data) {
    let headers = new Headers()
    // Set JSON header so that data is parsed by bodyParser on the backend
    headers.append('Content-Type', 'application/json')
    return this.http.post('/todos', JSON.stringify(data), {
      headers: headers
    }).map((res) => {
      return JSON.parse(res._body)
    })
  }

  deleteTodo(id) {
    return this.http.delete('/todos/'+ id)
      .map((res) => {
        return JSON.parse(res._body)
      })
  }
}

// Declares that HTTP should be injected each time a new instance of TodoService is created

TodoService.parameters = [new Inject(Http)]

export {TodoService}
