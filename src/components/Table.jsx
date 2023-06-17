import ContentEditable from 'react-contenteditable';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import React from 'react';
export const Table = ({ data, handleData }) => {



	const onContentChange = (e) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

		handleData(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf))
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
                {data.map((order) => (
                    <tr key={order.id}>
                        <td>
                            <ContentEditable
			                    onChange={onContentChange}
			                    onBlur={onContentChange}
			                    html={order.id.toString()} />  
                        </td>
                        <td>
                        <ContentEditable
			                    onChange={onContentChange}
			                    onBlur={onContentChange}
			                    html={order.customer} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );     
}