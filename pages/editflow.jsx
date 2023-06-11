import React, {useRef, useState} from "react"
import {Button} from '@shopify/polaris'
import EmailEditor from 'react-email-editor'
import './style.css'
import {jsonSample} from "../assets/index.js";


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

    const onReady = () => {
        // editor is ready
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        console.log('onLoad');

        emailEditorRef.current?.editor?.addEventListener(
            'design:loaded',
            onDesignLoad
        );

        emailEditorRef.current?.editor?.loadDesign(jsonSample);
    };

    return (
        <div>
            <Button primary id='button1' onClick={exportHtml}>Export template</Button>
            <Button onClick={togglePreview}>{preview ? 'Hide': 'Show'}Preview</Button>
            <Button primary id='button1' onClick={saveDesign}>Save template</Button>
            <Button destructive>Leave</Button>
            <EmailEditor ref={emailEditorRef} onReady={onReady} minHeight={750}/>
        </div>
    );
};

export default EditFlow