import path from 'path'
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';


const PORT = 'localhost:5000'
const PROTO_PATH = path.resolve(__dirname, './protos/todo.service.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage as any

const client = new todoPackage.Todo(PORT, grpc.credentials.createInsecure())


client.createTodo({
    'id':-1,
    'text': 'Do laundry'
}, (error: any, response: any) => {
    console.log('Recieved from server' + JSON.stringify(response))
})