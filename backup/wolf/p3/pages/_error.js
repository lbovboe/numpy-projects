import React from 'react';
import { Component } from 'react';
import ErrorPage from 'next/error';
import { ResLogWriter } from '../public/scripts/publicFunction';

class CustomErrorPage extends Component {
    static getInitialProps({ res, err }) {
      if (res && res.statusCode === 404 && !err) {
        ResLogWriter(res.req.url,res.statusCode);
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }else if(res && res.statusCode === 500 && process.env.ENVIRONMENT == 'production'){
        ResLogWriter(res.req.url,res.statusCode);
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }else if(res){
        ResLogWriter(res.req.url,res.statusCode);
      }
      return {};
    }
  
    render() {
      return <ErrorPage statusCode={404} />;
    }
  }
  
export default CustomErrorPage;
