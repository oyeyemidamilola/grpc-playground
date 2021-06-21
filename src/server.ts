import path from 'path'
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';



function startServer() {

    const PORT = 'localhost:5000'
    const PROTO_PATH = path.resolve(__dirname, './protos/todo.service.proto')
    const packageDef = protoLoader.loadSync(PROTO_PATH, {})
    const grpcObject = grpc.loadPackageDefinition(packageDef)
    const todoPackage = grpcObject.todoPackage as any
    const server = new grpc.Server()

    server.bind(PORT, grpc.ServerCredentials.createInsecure())
    server.addService(todoPackage.Todo.service, {
        "createTodo": createTodo,
        "readTodos": readTodos
    })

    server.start()
    console.log(`Server running at ${PORT}`)
}

const todos = []
function createTodo (call: any , callback: any) {
    const todoItem = {
        'id': todos.length + 1,
        'text': call.request.text
    }
    todos.push(todoItem)
    callback(null, todoItem)
}

function readTodos (call: any , callback: any) {

}

startServer()