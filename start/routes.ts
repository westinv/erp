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
Route.resource('/pdv', 'PvdsController').apiOnly()
).middleware('auth:api,apiAccount')

Route.group(() =>
Route.resource('/client', 'ClientsController').apiOnly(),
).middleware('auth:api,apiAccount')
Route.get('/client/pdv/id',  'ClientsController.indexByPdvId')

Route.group(() =>
Route.resource('/signaturecleint', 'SignatureClientsController').apiOnly()
)//.middleware('auth:api,apiAccount')

Route.group(() =>
Route.resource('/product', 'ProductsController').apiOnly()
).middleware('auth:api,apiAccount')
Route.get('/product/pdv/id', 'ProductsController.indexByPdvId')

Route.group(() =>
Route.resource('/signature', 'SignaturesController').apiOnly()
)//.middleware('auth:api,apiAccount')

Route.group(() =>
Route.resource('/sale', 'SalesController').apiOnly()
)//.middleware('auth:api,apiAccount')

Route.group(() =>
Route.resource('/kit', 'KitsController').apiOnly()
)//.middleware('auth:api,apiAccount')
Route.post('/kitproduct', 'KitsController.kitProduct')
Route.delete('/kitproduct/:id', 'KitsController.kitProductDelete')
Route.put('/kitproduct/:id', 'KitsController.kitProductUpdate')

Route.group(() =>
Route.resource('/releases', 'ReleasesController').apiOnly()
)//.middleware('auth:api,apiAccount')

Route.group(() =>
Route.resource('/fixedexpenses', 'FixedExpensesController').apiOnly()
)//.middleware('auth:api,apiAccount')
Route.get('/fixedexpenses/pdv/:id', "FixedExpensesController.showHistoryByPdvId")


Route.group(() =>
Route.resource('/costhistory', 'CostHistoriesController').apiOnly())
Route.get('/costhistory/cost/pdv/:id', 'CostHistoriesController.showCostByPdvId')
Route.get('/costhistory/fixed/pdv/:id', 'CostHistoriesController.showFixedRxpensesByPdvId')




Route.get('/history/pdv/:id', 'HistoriesController.showHistoryByPdvId')
Route.get('/history/client/:id', 'HistoriesController.showHistoryByClientId')
Route.get('/history/product/:id', 'HistoriesController.showHistoryByproductId')
Route.get('/history/signature/:id', 'HistoriesController.showHistoryBySignaturesId')

Route.post('/login', 'AuthController.login')
Route.post('/loginaccount', 'AuthController.loginAccount')

