import ContentEditable from 'react-contenteditable';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import React from 'react';
import { Td } from './Td';
export const Table = ({ data, handleData }) => {



	const onContentChange = (e) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

		handleData(e, sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf))
	};
    return (   
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                </tr>
            </thead>
            <tbody>
                {data.map((order, index) => (
                   
                    <tr key={order.id}>
                        <Td singledata={order} index={index}/>
                    </tr>
                ))}

            </tbody>
        </table>
    );     
}