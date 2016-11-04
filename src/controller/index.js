'use strict';

import Base from './base.js';
import path from 'path';
import fs from 'fs';
import jssha from 'jssha';


let filePath = path.join(think.ROOT_PATH, 'sha-file.txt');

function writeFile(content) {
  let ws = fs.createWriteStream(filePath, {flags: 'a'});
  ws.write(content);
  ws.close();
}

function generateSHA(parser) {
  var shaObj = new jssha("SHA-1", "TEXT");
  shaObj.update(parser);
  var hash = shaObj.getHash("B64");
  return hash;
}

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  shaAction(){
    let shaPass = generateSHA(this.get('pass'));
    let content = `${this.get('name')}{SHA}${shaPass}\r`;
    writeFile(content);
    return this.success(content);
  }
}