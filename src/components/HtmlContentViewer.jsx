import React, { useState, useEffect, useRef } from 'react';
import './HtmlContentViewer.css';

const HtmlContentViewer = ({ htmlFile, weekTitle }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shadowHostRef = useRef(null);
  const shadowRootRef = useRef(null);

  useEffect(() => {
    const loadHtmlContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Add cache-busting parameter to force reload
        const cacheBuster = `?v=${Date.now()}`;
        const response = await fetch(htmlFile + cacheBuster);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Extract both styles and body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Get all style tags from head
        const styles = Array.from(doc.head.querySelectorAll('style'))
          .map(style => style.outerHTML)
          .join('\n');
        
        // Combine styles with body content
        const fullContent = styles + doc.body.innerHTML;
        
        setHtmlContent(fullContent);
      } catch (err) {
        console.error('Error loading HTML content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (htmlFile) {
      loadHtmlContent();
    }
  }, [htmlFile]);

  useEffect(() => {
    if (shadowHostRef.current && htmlContent && !shadowRootRef.current) {
      // Create shadow DOM to isolate styles
      shadowRootRef.current = shadowHostRef.current.attachShadow({ mode: 'open' });
    }
    
    if (shadowRootRef.current && htmlContent) {
      // Insert content into shadow DOM
      shadowRootRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  if (loading) {
    return (
      <div className="html-content-viewer">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading content for {weekTitle}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="html-content-viewer">
        <div className="error-state">
          <h3>⚠️ Error Loading Content</h3>
          <p>{error}</p>
          <p className="hint">
            Make sure the file <code>{htmlFile}</code> exists in the <code>public/</code> directory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="html-content-viewer">
      <div 
        ref={shadowHostRef}
        className="html-content"
      />
    </div>
  );
};

export default HtmlContentViewer;
