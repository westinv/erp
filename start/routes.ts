import Route from '@ioc:Adonis/Core/Route'
//--------------------------Salesman----------------------------------------------------------------------
Route.get("/", () => { true })
Route.post('/salesman', 'SalesmenController.store');
Route.delete('/salesman/:id', 'SalesmenController.destroy').middleware('auth');
Route.get('/salesman', 'SalesmenController.index').middleware('auth');
Route.get('/salesman/:id', 'SalesmenController.show').middleware('auth');
Route.put('/salesman/:id', 'SalesmenController.update').middleware('auth');

//-------------------------Account------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/account', 'AccountsController').apiOnly()
).middleware('auth')

//-------------------------PDV------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/pdv', 'PvdsController').apiOnly()
).middleware('auth:api,apiAccount')
Route.get('/listpdv', 'PvdsController.showlistclient').middleware('auth:api,apiAccount')
Route.put('/active/:id', 'PvdsController.isActivePdv')

//-------------------------Client------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/client', 'ClientsController').apiOnly(),
).middleware('auth:api,apiAccount')
Route.get('/client/pdv/:id', 'ClientsController.indexByPdvId')
Route.get('/listclient', 'ClientsController.showlistclient').middleware('auth:api,apiAccount')
Route.get('/clientcode', 'ClientsController.indexByClientCode')

//-------------------------SignatureClient------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/signatureclient', 'SignatureClientsController').apiOnly()
).middleware('auth:api,apiAccount')
Route.get('/listsignatureclient/:id', 'SignatureClientsController.indexByclientId').middleware('auth:api,apiAccount')
Route.get('/listsignatureactive', 'SignatureClientsController.indexByActive').middleware('auth:api,apiAccount')
//-------------------------Product------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/product', 'ProductsController').apiOnly()
).middleware('auth:api,apiAccount')
Route.get('/product/pdv/id', 'ProductsController.indexByPdvId')
Route.get('/listproduct', 'ProductsController.showlistProducts').middleware('auth:api,apiAccount')

//-------------------------Signature------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/signature', 'SignaturesController').apiOnly()

).middleware('auth:api,apiAccount')
Route.post('/signatureids', 'SignaturesController.sigantureIds')
Route.delete('/signatureids/:id', 'SignaturesController.signatureDeleteProduct')
Route.put('/signature/products/:id', "SignaturesController.signatureUpdateProdructs")
Route.get('/listsignature', 'SignaturesController.showlistSignature').middleware('auth:api,apiAccount')

//-------------------------Sale------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/sale', 'SalesController').apiOnly()
).middleware('auth:api,apiAccount')
Route.post('/carrinho', 'SalesController.carrinho').middleware('auth:api,apiAccount')
Route.get('/listsale/:id', 'SalesController.listByClient')
Route.get('/listsalebypdv/:id', 'SalesController.listByPdv')

//-------------------------Kit------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/kit', 'KitsController').apiOnly()
).middleware('auth:api,apiAccount')
Route.post('/kitproduct', 'KitsController.kitProduct')
Route.delete('/kitproduct/:id', 'KitsController.kitProductDelete')
Route.put('/kitproduct/:id', 'KitsController.kitProductUpdate')
Route.delete('/kitproduct/product/:id', 'KitsController.kitProductDeleteProduct')
Route.get('/listkits', 'KitsController.showlistkits').middleware('auth:api,apiAccount')
Route.get('/findproduct/:id', 'KitsController.FindProducts')

//-------------------------Releases------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/releases', 'ReleasesController').apiOnly()
).middleware('auth:api,apiAccount')
Route.get('/listrelease/:id', 'ReleasesController.showReleasesByPdvId')
Route.get('/listrelease', 'ReleasesController.showlistReleases').middleware('auth:api,apiAccount')

//-------------------------FixexExpenses------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/fixedexpenses', 'FixedExpensesController').apiOnly()
)//.middleware('auth:api,apiAccount')
Route.get('/fixedexpenses/pdv/:id', "FixedExpensesController.showExpensesByPdvId")

//-------------------------CostHistory------------------------------------------------------------------------
Route.group(() =>
  Route.resource('/costhistory', 'CostHistoriesController').apiOnly())
Route.get('/costhistory/cost/pdv/:id', 'CostHistoriesController.showCostByPdvId')
Route.get('/costhistory/fixed/pdv/:id', 'CostHistoriesController.showExpensesByPdvId')

//-------------------------History------------------------------------------------------------------------
Route.get('/history/pdv/:id', 'HistoriesController.showHistoryByPdvId')
Route.get('/history/client/:id', 'HistoriesController.showHistoryByClientId')
Route.get('/history/product/:id', 'HistoriesController.showHistoryByproductId')
Route.get('/history/signature/:id', 'HistoriesController.showHistoryBySignaturesId')

//-------------------------login------------------------------------------------------------------------
Route.post('/login', 'AuthController.login')
Route.post('/loginaccount', 'AuthController.loginAccount')

