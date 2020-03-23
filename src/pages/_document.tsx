import React from 'react';
import Document, { Main } from 'next/document';
import { CustomHead } from '../next931/CustomHead';

export default class CustomDocument extends Document {
    render() {
        return (
            <html lang="en-US">
                <CustomHead />
                <body className="header-static">
                    <Main />
                </body>
            </html>
        );
    }
}
