const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const { it } = require('arrow-mocha/es5');

import { buildFile } from '../../../../server/build/controllers/expressBuild/buildFile.js';

describe('File Builder', () => {
  const fileConfig = {
    type: 'main',
  };
  const userConfig = {
    serverType: 'node-express',
    appName: 'ACoolApp',
    serverSettings: {
      port: 3000,
      expressName: 'app',
    },
  };
  it('should call not return an error when called on the main server file', () => {
    expect(buildFile(fileConfig, userConfig)).to.not.be.an('error');
  });

  describe('Creation of the main server file', () => {
    it('should return a string', () => {
      expect(buildFile(fileConfig, userConfig)).to.be.a('string');
    });

    it('contains code that tells the server to listen', () => {
      const str = 'app.listen(3000, function () {console.log(\'ACoolApp listening on port 3000\')';
      expect(buildFile(fileConfig, userConfig).indexOf(str)).to.be.above(-1);
    });

    it('contains code that instantiates express', () => {
      const str = 'var app = require (\'express\');';
      expect(buildFile(fileConfig, userConfig).indexOf(str)).to.be.above(-1);
    });

    it('defaults to port 3000 when no port is provided', () => {
      const newUserConfig = {
        serverType: 'node-express',
        appName: 'ACoolApp',
        serverSettings: {
          port: 8000,
          expressName: 'app',
        },
      };
      const str = 'app.listen(8000, function () {console.log(\'ACoolApp listening on port 8000\')';
      expect(buildFile(fileConfig, newUserConfig).indexOf(str)).to.be.above(-1);
    });

    it('adds middleware code to the file if provided');
  });
});
