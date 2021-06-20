import path from 'path'
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';



function appStart() {

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


function createTodo (call: any , callback: any) {
    console.log(call)
}

function readTodos (call: any , callback: any) {

}

appStart()