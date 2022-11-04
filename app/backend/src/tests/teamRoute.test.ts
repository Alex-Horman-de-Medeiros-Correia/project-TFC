import * as chai from 'chai';
import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);


  describe('Quando a requisição é feita com sucesso', () => {
    it('debe retornar um status 200', async () => {
      const httResponse = await chai.request(app).get('/teams')
      expect(httResponse.status).to.equal(200)
    })
    it('debe retornar um status 200', async () => {
      const httResponse = await chai.request(app).get('/teams/:id')
      expect(httResponse.status).to.equal(200)
    })
  })
  