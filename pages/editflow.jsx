import React, {useRef, useState} from "react"
import {Button} from '@shopify/polaris'
import EmailEditor from 'react-email-editor'
import './style.css'
import htmlLink from './example.html.js'
import {trophyImage} from "../assets/index.js";
import { Liquid } from 'liquidjs';
import htmlToJSON from 'html-to-json';



const EditFlow = (props) => {
    const emailEditorRef = useRef(null);
    const [preview, setPreview] = useState(false);

    const saveDesign = () => {
        emailEditorRef.current?.editor?.saveDesign((design) => {
            console.log('saveDesign', design);
        });
    };

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    };

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };

    const onDesignLoad = (data) => {
        console.log('onDesignLoad', data);
    };

    const onReady = async () => {
        // editor is ready
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        console.log('onLoad');

        emailEditorRef.current?.editor?.addEventListener(
            'design:loaded',
            onDesignLoad
        );
        const liquidContent = `
        {% capture email_title %}Welcome to {{ shop.name }}!{% endcapture %}
        {% capture email_body %}You've activated your customer account. Next time you shop with us, log in for faster checkout.{% endcapture %}

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>{{ email_title }}</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" type="text/css" href="/assets/notifications/styles.css">
            <style>
              .button__cell { background: {{ shop.email_accent_color }}; }
              a, a:hover, a:active, a:visited { color: {{ shop.email_accent_color }}; }
            </style>
          </head>

          <body>
            <table class="body">
              <tr>
                <td>
                  <table class="header row">
                    <tr>
                      <td class="header__cell">
                        <center>
                          <table class="container">
                            <tr>
                              <td>
                                <table class="row">
                                  <tr>
                                    <td class="shop-name__cell">
                                      {%- if shop.email_logo_url %}
                                        <img src="{{shop.email_logo_url}}" alt="{{ shop.name }}" width="{{ shop.email_logo_width }}">
                                      {%- else %}
                                        <h1 class="shop-name__text">
                                          <a href="{{shop.url}}">{{ shop.name }}</a>
                                        </h1>
                                      {%- endif %}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </table>

                  <table class="row content">
                    <tr>
                      <td class="content__cell">
                        <center>
                          <table class="container">
                            <tr>
                              <td>
                                <h2>{{ email_title }}</h2>
                                <p>{{ email_body }}</p>
                                {% if shop.url %}
                                  <table class="row actions">
                                    <tr>
                                      <td class="actions__cell">
                                        <table class="button main-action-cell">
                                          <tr>
                                            <td class="button__cell"><a href="{{ shop.url }}" class="button__text">Visit our store</a></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                {% endif %}
                              </td>
                            </tr>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </table>

                  <table class="row footer">
                    <tr>
                      <td class="footer__cell">
                        <center>
                          <table class="container">
                            <tr>
                              <td>
                                <p class="disclaimer__subtext">If you have any questions, reply to this email or contact us at <a href="mailto:{{ shop.email }}">{{ shop.email }}</a></p>
                              </td>
                            </tr>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </table>

                  <img src="{{ 'notifications/spacer.png' | shopify_asset_url }}" class="spacer" height="1" />
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;
        const liquidEngine = new Liquid();

        const htmlContent = await liquidEngine.parseAndRender(liquidContent, {
            shop: {
                name: 'My Shop',
                email_accent_color: '#ff0000',
                email_logo_url: trophyImage,
                email_logo_width: '200px',
                url: 'https://example.com',
                email: 'info@example.com'
            }
        });
        const jsonContent = htmlToJSON.parse(htmlContent);
        emailEditorRef.current?.editor?.loadDesign(jsonContent);
    };

    return (
        <div>
            <Button primary id='button1' onClick={exportHtml}>Export template</Button>
            <Button onClick={togglePreview}>{preview ? 'Hide': 'Show'}Preview</Button>
            <Button primary id='button1' onClick={saveDesign}>Save template</Button>
            <Button destructive url='/dashboard'>Leave</Button>
            <EmailEditor ref={emailEditorRef} onReady={onReady} minHeight={750}/>
        </div>
    );
};

export default EditFlow