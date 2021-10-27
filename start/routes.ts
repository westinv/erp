import Route from '@ioc:Adonis/Core/Route'


Route.get("/", () =>{true})
Route.post('/salesman', 'SalesmenController.store');
Route.delete('/salesman/:id', 'SalesmenController.destroy').middleware('auth');
Route.get('/salesman', 'SalesmenController.index').middleware('auth');
Route.get('/salesman/:id', 'SalesmenController.show').middleware('auth');
Route.put('/salesman/:id', 'SalesmenController.update').middleware('auth');

Route.group(() =>
  Route.resource('/account', 'AccountsController').apiOnly()
).middleware('auth')

Route.group(()=>
Route.resource('/pvd', 'PvdsController').apiOnly()
).middleware('auth')

Route.resource('/signaturecleint', 'SignatureClientsController').apiOnly()
Route.resource('/client', 'ClientsController').apiOnly()
Route.resource('/product', 'ProductsController').apiOnly()
Route.resource('/signature', 'SignaturesController').apiOnly()


Route.post('/login', 'AuthController.login')
Route.post('/loginaccount', 'AuthController.loginAccount')
