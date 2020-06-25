import React, { PureComponent, Fragment } from 'react';
import Calendar from 'react-calendar';
import { APP_CONSTS } from '../ws/constants';
import 'react-calendar/dist/Calendar.css';
import './home.css';

const moment = require('moment');

export class Home extends PureComponent {
  state = {
    isLoading: null,
    chosenDate: new Date(),
    selectedDate: null,
    availability: null,
    minDate: new Date(),
    maxDate: null,
  }

  dayClick = 0;

  componentDidMount() {
    this.getItemAvailability(this.state.chosenDate);
  }

  getItemAvailability = (date) => {
    date = moment(date);
    let startDate = moment(date);
    startDate = startDate.subtract(15, 'd').isBefore(moment()) ? moment() : startDate.subtract(15, 'd').startOf('month');
    const intervalRange = [startDate.format("YYYY/MM/DD"), date.add(1, 'M').endOf('month').add(15, 'd').format("YYYY/MM/DD")];

    fetch(APP_CONSTS.API_DEFAULT_PATH + `/items/25/availability?start_at=${intervalRange[0]}&end_at=${intervalRange[1]}&interval=true`)
      .then(res => res.json())
      .then(
        (availability) => {
          this.setState({
            isLoaded: true,
            availability
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  onChange = selectedDate => this.setState({ selectedDate })
  onActiveStartDateChange = (activeDate) => {
    const { selectedDate } = this.state;
    const isSameMonth = moment(activeDate.activeStartDate).isSame(selectedDate, 'month');

    if (!isSameMonth) {
      this.getItemAvailability(activeDate.activeStartDate);
      this.setState({ chosenDate: activeDate.activeStartDate });
    }
  }

  onClickDay = (date) => {
    this.dayClick++;
    if (this.dayClick === 1) {
      const minDate = new Date(date);
      const maxDate = this.checkNextUnavailableDate(date);
      this.setState({ maxDate, minDate });
    } else if (this.dayClick === 2) {
      this.dayClick = 0;
    }
  }

  setAvailability = ({ date }) => {
    const { availability } = this.state;
    if (availability) {
      const availablePeriods = availability?.data?.attributes?.available_periods;
      for (let i = 0, n = availablePeriods?.length; i < n; i++) {
        if (moment(date).isBetween(moment(availablePeriods[i][0]), moment(availablePeriods[i][1]), 'day', '[)')) {
          return false;
        }
      }
    }

    return true;
  }

  clearDates = () => {
    this.setState({ selectedDate: null, maxDate: null, minDate: new Date() });
  }

  checkNextUnavailableDate = (date) => {
    const { availability } = this.state;
    if (availability) {
      const availablePeriods = availability?.data?.attributes?.available_periods;

      for (let i = 0, n = availablePeriods?.length; i < n; i++) {
        if (moment(date).isBefore(moment(availablePeriods[i][1]))) {
          return new Date(availablePeriods[i][1]);
        }
      }
    }
  }

  render() {
    const { selectedDate, isLoading } = this.state;
    const loadingClass = isLoading ? "ajaxLoading" : "";

    return (
      <Fragment>
        <div className="loader-wrapper">
          <div className="container cn">
            <i className="far fa-compass fa-spin fa-3x fa-fw"></i>
          </div>
        </div>

        <input type="hidden" name="item_id" id="item_id" value="1960" />
        <input type="hidden" name="item_title" id="item_title" value="Babolat Pure Drive - Raquete Ténis" />
        <input type="hidden" name="item_price" id="item_price" value="4.94" />
        <div className="item__detail item__detail_long">
          <div className="row item_page_row">
            <div className="col-sm-8 item_page_left_column">
              <div className="panel" style={{ marginBottom: 10 }}>
                <div className="row">
                  <div className="col-xs-12">
                    <div id="carousel-1960" className="carousel items__page_carousel cn  slide item__carousel"
                      data-ride="carousel" data-interval="false">
                      <div className="carousel-caption">
                        <div className="item__tag_label">
                          <p><a href="/pt/items/search?q=Desporto">Desporto</a></p>
                        </div>
                      </div>
                      <div className="carousel-inner">
                        <div className="item active">
                          <img alt="Babolat Pure Drive - Raquete Ténis" className="img-responsive center-block"
                            src="https://dc3h9n0uz6yfs.cloudfront.net/item_photos/photos/000/004/739/large/101334_1_5.jpg?1583404891" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row" style={{ padding: "0px 20px" }}>
                  <div className="col-xs-12">
                    <div className="col-xs-10">
                      <h1 id="item_title"><b>Item Name</b></h1>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <span className="item_page_green_all_caps_title"> <i className="glyphicon glyphicon-map-marker"></i> Porto,
            Portugal</span>
                  </div>
                </div>

                <div className="row" style={{ padding: "0px 20px 40px 20px" }}>
                  <div className="col-xs-12">
                    Weight unstrung 300 g
                    Technology Cortex Pure Feel, FSI Power, GT Technology, Elliptic Beam
                    Composition GRAPHITE
                    Head Size 99.98 in² / 645 cm²
                    Length 26.97 in / 68.5 cm
                    Stiffness 72 RA
                    Balance unstrung 12.6 in / 32 cm
                    Beam Width 23-26-23 mm
                    String Pattern 16X19
        </div>
                </div>
              </div>
              <div className="col-xs-12 text-center not_visible_mobile" style={{ color: "grey" }}>
                <div>
                  <div className="col-xs-2 text-center">
                    <small><b>SABIAS QUE?</b></small>
                  </div>
                  <div className="col-xs-10 text-left">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="7000"
                      style={{ background: "transparent" }}>
                      <div className="carousel-inner">
                        <div className="item active">
                          <small>Alugar é, em média, 90% mais barato que comprar. <span
                            className="glyphicon glyphicon-piggy-bank"></span> </small>
                        </div>
                        <div className="item">
                          <small>Podes aumentar o teu rendimento mensal até 20% alugando as tuas coisas. <span
                            className="glyphicon glyphicon-circle-arrow-up"></span></small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 item_page_right_column">
              <div className="col-xs-12">
                <div className="panel panel-default user__info_panel" style={{ marginBottom: 10 }}>
                  <div className="user__info_panel_body">
                    <div className="row" style={{ display: "flex", alignItems: "center" }}>
                      <div className="col-xs-2">
                        <div style={{ width: 50, height: 50, overflow: "hidden", borderRadius: "50%", margin: "0 auto" }}>
                          <a href="/pt/profile/9194"><img
                            style={{ width: "100%", height: "auto", minWidth: 50, minHeight: 50 }}
                            src="https://dc3h9n0uz6yfs.cloudfront.net/users/avatars/000/009/194/thumb_medium/picture?1583404198"
                            alt="Picture?1583404198" /></a>
                        </div>
                      </div>
                      <div className="col-xs-7">
                        <a href="/pt/profile/9194"><img style={{ minHeight: 70 }} src="https://dc3h9n0uz6yfs.cloudfront.net/users/avatars/000/009/194/thumb_medium/picture?1583404198" alt="Picture?1583404198" /></a>
                        <div className="user__info_name_social_links_and_level">
                          <strong><a id="owner_name" href="/pt/profile/9194">Owner Name</a></strong>
                          <i className="glyphicon glyphicon-ok-sign"></i>
                        </div>
                      </div>
                      <div className="col-xs-3 user__info_rating cn">

                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-xs-12">
                  <div className="panel panel-default item__details_panel ">

                    <div className="item__detail_price">
                      <strong>€00,00</strong> / dia

          </div>

                    <div className="panel-body text-center">
                      <p>Confere já as datas disponíveis para reservar!</p>
                      <Calendar
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        selectRange
                        showDoubleView
                        locale="pt"
                        onChange={this.onChange}
                        onClickDay={this.onClickDay}
                        onActiveStartDateChange={this.onActiveStartDateChange}
                        value={this.state.selectedDate}
                        tileDisabled={this.setAvailability}
                      />
                      <div className="buttonsHolder">
                        <p>Data de início: <span>{moment(selectedDate?.[0]).format("DD/MM/YYYY")}</span> - Data de fim: <span>{moment(selectedDate?.[1]).format("DD/MM/YYYY")}</span></p>
                        <i className="fa fa-times dangerText"></i> <button type="button" className="simpleBtn linkBtn" onClick={this.clearDates}> Limpar Datas</button>
                      </div>
                    </div>
                    <div className="items__quick_booking_container">

                      <button className="btn btn-primary">Default button</button>
                    </div>
                  </div>

                </div>
              </div>
              <div className="text-center">
                <small> <a id="info_zone_link" href="#info_zone_row">Como funciona</a> / <a id="feedback_zone_link"
                  href="#feedback_zone_row">Feedback</a></small>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div id="item_small_map" className="small_map"></div>
            </div>
          </div>

        </div>
      </Fragment>
    );
  }
}
