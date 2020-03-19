import React from 'react';
import Document, { Head, Main } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <html lang="en-US">
                <Head />
                <body className="header-static">
                    <Main />
                </body>
            </html>
        );
    }
}
