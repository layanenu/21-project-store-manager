const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");
const { products } = require("./mocks/products.controller.mock");

describe("Teste de unidade do productController", function () {
  describe("Listando os produtos", function () {
    it("Deve retornar o status 200 e a lista de produtos", async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "listAllProducts")
        .resolves({ type: null, message: products });

      // act
      await productController.listAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Buscando um produto', function () { 
    it("deve responder com 200 e o produto quando existir", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductById")
        .resolves({ type: null, message: products[0] });

      // Act
      await productController.getProductById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    // it("ao passar um id inválido deve retornar um erro", async function () {
    //   // Arrange
    //   const res = {};
    //   const req = {
    //     params: { id: "abc" }, // passamos aqui um id inválido para forçar o erro esperado
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();
    //   // Definimos o dublê do service retornando o contrato definido.
    //   sinon
    //     .stub(passengerService, "findById")
    //     .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

    //   // Act
    //   await passengerController.getPassenger(req, res);

    //   // Assert
    //   // Avaliamos se chamou `res.status` com o valor 422
    //   expect(res.status).to.have.been.calledWith(422);
    //   // Avaliamos se chamou `res.status` com a mensagem esperada
    //   expect(res.json).to.have.been.calledWith('"id" must be a number');
    // });
  });

  // it('ao passar um id que não existe no banco deve retornar um erro', async function () {
  //     // Arrange
  //     const res = {};
  //     const req = {
  //       params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
  //     };

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     // Definimos o dublê do service retornando o contrato definido para esse cenário
  //     sinon
  //       .stub(passengerService, 'findById')
  //       .resolves({ type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' });

  //     // Act
  //     await passengerController.getPassenger(req, res);

  //     // Assert
  //     // Avaliamos se chamou `res.status` com o valor 404
  //     expect(res.status).to.have.been.calledWith(404); 
  //     // Avaliamos se chamou `res.status` com a mensagem esperada
  //     expect(res.json).to.have.been.calledWith('Passenger not found');
  //   });
  // });

  afterEach(function () {
  sinon.restore();
  });
});
