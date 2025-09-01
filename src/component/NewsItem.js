import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <div className="card" style={{ color: props.mode === 'dark' ? 'white' : 'black', background: props.mode === 'dark' ? '#212529' : 'white',height: '530px' }} >
          <span className="position-absolute d-flex  rounded-pill badge bg-danger" style={{right:'0',justifyContent:'flex-end'}}>{source} </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
              {/* <span className={`badge text-bg-${this.props.mode === 'dark' ? 'info' : 'secondary'}`}>{source}</span> */}
            <p className="card-text">{description}...</p>
            <p className="card-text"><small style={{ color: props.mode === 'dark' ? 'rgb(192 195 198)' : '#6c757d', fontStyle: 'italic', fontSize: '0.8rem' }}>By {author ? author : "Unknown"} on {new Date(date).toGMTString(date)}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-${props.mode === 'dark' ? 'primary' : 'dark'}`}>Read More</a>

          </div>
        </div>
      </div>
    )
}

export default NewsItem
