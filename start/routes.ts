import Route from '@ioc:Adonis/Core/Route'



Route.post('/salesman', 'SalesmenController.store');
Route.delete('/salesman/:id', 'SalesmenController.destroy').middleware('auth');
Route.get('/salesman', 'SalesmenController.index').middleware('auth');
Route.get('/salesman/:id', 'SalesmenController.show').middleware('auth');
Route.put('/salesman/:id', 'SalesmenController.update').middleware('auth');



Route.resource('/account', 'AccountsController').apiOnly()
Route.resource('/pvd', 'PvdsController').apiOnly()

Route.post('/login', 'AuthController.login')
Route.post('/loginaccount', 'AuthController.loginAccount')
