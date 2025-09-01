import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import default1 from './default.jpg';
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
    totalResults: 0
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsIts - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // let url = "http://127.0.0.1:5500/sampleOutput.json";

    try {
      let data = await fetch(url);
      this.props.setProgress(30);
      let parseData = await data.json();
      this.props.setProgress(60);
      this.setState({
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let url = "http://127.0.0.1:5500/sampleOutput.json";

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  render() {
    return (
      <>
        <h1 className="text-center mb-4" style={{ color: this.props.mode === 'dark' ? 'white' : 'black',marginTop: '60px' }}>
          NewsIts - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
        </h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Loading />}
        >
          <div className='container'>
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-3 my-2" key={`${element.url}-${index}`}>
                    <NewsItem
                      mode={this.props.mode}
                      title={element.title ? element.title.split(" ").slice(0, 12).join(" ") : " "}
                      description={element.description ? element.description.split(" ").slice(0, 12).join(" ") : " "}
                      imageUrl={element.urlToImage || default1}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
