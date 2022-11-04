import * as chai from 'chai';
import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);


  describe('TestANDO Login', () => {
    it('Retorna status 200', async () => {
      const httResponse = await chai.request(app).get('/login')
      
      expect(httResponse.status).to.equal(200)
    })
  })
