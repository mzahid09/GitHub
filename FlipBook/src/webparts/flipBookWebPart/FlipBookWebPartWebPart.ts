import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IWebPartData } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField, //import single line and multiline text field
  PropertyPaneButton, //buttons
  PropertyPaneCheckbox, //check boxes
  PropertyPaneDropdown, //dropdown menu
  PropertyPaneToggle, //toggle button
  PropertyPaneLabel,
  PropertyPaneSlider,
  IPropertyPaneDropdownOption,
  PropertyPaneLink,
  PropertyPaneHorizontalRule,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './FlipBookWebPartWebPart.module.scss';
import * as strings from 'FlipBookWebPartWebPartStrings';
//importing the mock array of items
import MockHttpClient from "./MockHttpClient";
//Load some external CSS files by using the module loader. Add the following import:
import { SPComponentLoader } from "@microsoft/sp-loader";
//helper class SPHttpClient is provided by SharePoint to execute REST API Requests.
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { PropertyFieldDropdownWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldDropdownWithCallout';
import { PropertyFieldLinkWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLinkWithCallout';
import FlipBookTemplate from './template/FlipBookTemplate';
//SharePoint Framework aids this capability by helping you understand which
//environment your web part is running from by using the EnvironmentType module.
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

import * as React from 'react';
//import jquery and jquerry UI
import * as jQuery from "jquery";
import "jqueryui";
import * as bootstrap from "bootstrap";
//import onload from 'onload';
import LoadA from 'LoadA';
import * as hammer from "hammerjs"; 
//import "turn";
//import * as Modernizr from 'modernizr';
//import "jquery-mousewheel";
//import "jquery-fullscreen";

//creating a interface that will be used for assigning properties and type checking
export interface IFlipBookWebPartWebPartProps {
  webpartTitle: string;
  siteURL: string;
  image1URL: string;
  image2URL: string;
  sourceList: string;
  headerColumnName: string;
  contentColumnName: string;
  noOfItems: number;
  dropdownInfoHeaderKey: string;
  PDFURL:string;
  }
  
  // list models to start working with SharePoint list data
  //The ISPList interface holds the SharePoint list information that we are connecting to.
  export interface ISPLists {
  value: ISPList[];
  }
  
  export interface ISPList {
  Header: string;
  Description: string;
  ID?: number;
  }
  //require("@microsoft/loader-set-webpack-public-path!");
  require('sp-init');
  require('microsoft-ajax');
  require('sp-runtime');
  require('sharepoint');
  require('modernizr');
  require('helper');
  require('hammer');
  require('wowbook');

  require('turn');
  //require('yepnope');
  //require('wait');
  //require('jquery-mousewheel');
  //require('jquery-fullscreen');
  //require('jquery-address');
  //require('pdf');
  //require('onload');
 
 


export default class FlipBookWebPartWebPart extends BaseClientSideWebPart<IFlipBookWebPartWebPartProps> {
  jQuery: any;
  
  public constructor() {
    super();


    }
//private method that mocks the list retrieval
private _getMockListData(): Promise<ISPLists> {
  return MockHttpClient.get().then((data: ISPList[]) => {
  var listData: ISPLists = { value: data };
  return listData;
  }) as Promise<ISPLists>;
  }

//private method to pull data from accordian list in sharepoint online
private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient
    .get(
    this.context.pageContext.web.absoluteUrl +
    `/_api/web/lists/GetByTitle('${
    this.properties.sourceList
    }')/items?top=${this.properties.noOfItems}&$select=ID,${
    this.properties.headerColumnName
    },${this.properties.contentColumnName}`,
    SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
    return response.json();
  });
  }
  //private method to render list information received from REST API
  private _renderList(items: ISPList[]): void {
  let html: string = ``;
  
  items.forEach((item: ISPList) => {
  var url = `${this.context.pageContext.web.absoluteUrl}/lists/${
      this.properties.sourceList
      }/EditForm.aspx?ID=${item.ID}`;
      html += `
      <h3>${item.Header}</h3>
      <div>
      <p>${
      item.Description
      }<a class="float-right" target=\"_self"\ href=\"${url}"><i class="fas fa-edit"></i></a>
      </p>
      </div>`;
      });
      const listContainer: Element = this.domElement.querySelector(
      "#spListContainer"
  );
  listContainer.innerHTML = html;
  
  //add options
  const accordionOptions: JQueryUI.AccordionOptions = {
  animate: true,
  collapsible: false,
  icons: {
  header: "ui-icon-circle-arrow-e",
  activeHeader: "ui-icon-circle-arrow-s"
  }
  };
  //initialize the accordian, class is .accordian and pass above options
  jQuery(".accordion", this.domElement).accordion(accordionOptions);
  }
  
  //private method to call the respective methods to retrieve list data:
  private _renderListAsync(): void {
  // Local environment
  if (Environment.type === EnvironmentType.Local) {
  this._getMockListData().then(response => {
  this._renderList(response.value);
  });
  } else if (
  Environment.type == EnvironmentType.SharePoint ||
  Environment.type == EnvironmentType.ClassicSharePoint
  ) {
  this._getListData().then(response => {
  this._renderList(response.value);
  });
  }
  }

  public render(): void {  
    //this.domElement.innerHTML = FlipBookTemplate.templateHtml;

    this.domElement.innerHTML =`<div class='book_container'>
		<div id="book">
			<div>Cover</div>
			<div>inside cover</div>
			<div>page 1</div>
			<div data-double='true'>I'm a double page, page 2 and page 3</div>
			<div>page 4</div>
			<div>inside back cover</div>
			<div>back cover</div>
		</div>
	</div>`;
  LoadA.generateDiagram(this.properties.siteURL);
    //LoadA.generateDiagram(this.properties.siteURL);
    //onload.generateDiagram(this.properties.siteURL);
  }
   
  protected get dataVersion(): Version {
  return Version.parse("1.0");
  }
  
  //method for validations
  private validateFields(value: string): string {
  if (value === null || value.trim().length === 0) {
  return "Provide a value";
  }
  
  if (value.length > 1000) {
  return "Value should not be longer than 100 characters";
  }
  
  return "";
  }
  private cobWPPropButtonClick() {
  alert("Property pane horozontal rule");
  }
  
  //In this method we add new properties to pane and mamp them to their typed objects
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
  //we can add them to multiple pages
  pages: [
  {
  header: {
  description: "Vital FlipBook WebPart"
  },
  //properties can be defined into groups,
  groups: [
  {
    groupName: "WebPart Settings",
    groupFields: [
    PropertyPaneTextField("webpartTitle", {
    label: "Web Part Title",
    onGetErrorMessage: this.validateFields
  }),
  
  PropertyPaneTextField("siteURL", {
    label: "Site URL",
    onGetErrorMessage: this.validateFields
  }),
  PropertyPaneTextField("image1URL", {
    label: "image 1 URL",
    onGetErrorMessage: this.validateFields
  }),
  PropertyPaneTextField("image2URL", {
    label: "Image 2 URL",
    onGetErrorMessage: this.validateFields
  }),
  PropertyPaneTextField("sourceList", {
    label: "Source List Name",
    onGetErrorMessage: this.validateFields
  }),
  PropertyPaneSlider("noOfItems", {
    label: "Max no of items to display",
    min: 1,
    max: 20,
    step: 2,
    showValue: true
  //ctrl + space gives all possible options you can use here
  }),
  PropertyPaneHorizontalRule(),
  PropertyPaneButton("", {
    text: "View Details",
    buttonType: PropertyPaneButtonType.Normal,
    onClick: this.cobWPPropButtonClick
  })
  ]
  }
  ]
  }
  ]
  };
  }
  }