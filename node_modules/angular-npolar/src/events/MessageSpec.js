'use strict';

let Message = require('./Message');
require('should');

describe("Message", () => {
  let httpMessage;
  let response = {
    status: 1,
    config: {},
    headers() {},
  };

  beforeEach(() => {
    httpMessage = new Message();
    response.body = undefined;
  });

  it("should handle api errors", () => {
    response.body = {
      "error": {
        "status": 501,
        "reason": "Not Implemented",
        "explanation": "No storage set for API endpoint, cannot handle request",
      }
    };

    httpMessage.getMessage(response).message.should.eql(response.body.error.explanation);
  });

  it("should handle gouncer errors", () => {
    response.body = {
      "status": 400,
      "http_message": "Bad request",
      "error": "Invalid something"
    };

    httpMessage.getMessage(response).message.should.eql(response.body.error);
  });

  it("should handle cicas errors", () => {
    response.body = {
      "status": 404,
      "reason": "Captcha not found",
      "success": false
    };

    httpMessage.getMessage(response).message.should.eql(response.body.reason);
  });

  it("should handle couch errors", () => {
    response.body = {
      "error": "not_found",
      "reason": "missing"
    };

    httpMessage.getMessage(response).message.should.eql("Not found");
  });

  it("should handle elasticsearch errors", () => {
    response.body = {
      "error": "IndexMissingException[[d] missing]",
      "status": 404
    };

    httpMessage.getMessage(response).message.should.eql(response.body.error);
  });

  it("should handle html errors", () => {
    response.body = "404 Not found";

    httpMessage.getMessage(response).message.should.eql(response.body);
  });
});
