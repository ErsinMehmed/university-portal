import { makeObservable, observable, action } from "mobx";
import adAction from "@/actions/adAction";
import commonStore from "./commonStore";

class Ad {
  ads = [];
  siteAds = [];
  currentPageSite = 1;
  totalPagesSite = 10000000000;
  totalAdsSite = null;
  currentPage = 1;
  perPage = 10;
  isLoading = true;
  searchText = "";
  showFilter = false;
  filterData = {
    dateFrom: "",
    dateTo: "",
    status: "",
    field: "",
    employmentType: "",
    minSalary: "",
    maxSalary: "",
  };
  adAdvacedSearchData = {
    keyword: "",
    location: "",
    category: "",
    position: "",
  };
  adDataCreate = {
    title: "Заглавие",
    category: "Категория",
    position: "Длъжност",
    location: "София (Пример)",
    salary: 5000,
    paid_leave: 20,
    education_requirements: "Средно образование",
    employment: "Пълно работно време",
    employment_type: "Тип заетоест",
    experience: "от 5 до 10+",
    details: `ПРИМЕР: Във връзка с разрастващите се нужди на нашата компания, търсим кандидат за позицията (Име на позицията). В ролята си, успешният кандидат ще бъде отговорен за разработването и изпълнението на иновативни стратегии, фокусирани върху разрастването на фирмените цели, с цел подобряване на бранда и постигане на бизнес целите на компанията. Стани част от (Име на компанията) за да дадеш старт на твоето личностно развитие!`,
    qualifications: [
      "Примерно изискване за длъжността (Добри познания в ....)",
      "Примерно изискване за длъжността (Английски език на добро ниво - говорим и писмено)",
      "Примерно изискване за длъжността (Способност за ....)",
      "Примерно изискване за длъжността (Познания в областта на ....)",
    ],
    qualification_section_order: 1,
    skills: [
      "Примерно търсено умение (Работа със системи за управление на ....)",
      "Примерно търсено умение (Разработка на приложения с ....)",
      "Примерно търсено умение (Възможност за ....)",
      "Примерно търсено умение (Умение за рработа с ....)",
    ],
    skill_section_order: 2,
    job_benefits: [
      "Какво предлагате (Бонуси и премии)",
      "Какво предлагате (Менторство и кариерно консултиране)",
      "Какво предлагате (25 дни платен годишен отпуск)",
      "Какво предлагате (Допълнително здравно осигуряване)",
    ],
    job_benefit_section_order: 3,
    apply_button_color: "bg-blue-500 hover:bg-blue-600",
    badge_color: "bg-blue-300",
    soft_skills: ["Стресоустойчив", "Проблеморешаващ", "Етчайлд"],
    languages: ["Английски", "Немски", "Френски"],
    remote_work: false,
  };

  constructor() {
    makeObservable(this, {
      ads: observable,
      siteAds: observable,
      currentPage: observable,
      perPage: observable,
      isLoading: observable,
      searchText: observable,
      filterData: observable,
      showFilter: observable,
      adDataCreate: observable,
      currentPageSite: observable,
      totalPagesSite: observable,
      totalAdsSite: observable,
      adAdvacedSearchData: observable,
      setSiteAds: action,
      setAds: action,
      setCurrentPage: action,
      setPerPage: action,
      setIsLoading: action,
      setSearchText: action,
      setFilterData: action,
      setShowFilter: action,
      setAdDataCreate: action,
      setCurrentPageSite: action,
      setTotalPagesSite: action,
      setTotalAdsSite: action,
      setAdAdvacedSearchData: action,
    });
  }

  setAds = (data) => {
    this.ads = data;
  };

  setSiteAds = (data) => {
    this.siteAds = data;
  };

  setCurrentPageSite = (data) => {
    this.currentPageSite = data;
  };

  setTotalPagesSite = (data) => {
    this.totalPagesSite = data;
  };

  setTotalAdsSite = (data) => {
    this.totalAdsSite = data;
  };

  setCurrentPage = (data) => {
    this.currentPage = data;
  };

  setPerPage = (perPage) => {
    this.perPage = perPage;

    const newTotalPages = Math.ceil(
      this.ads.pagination?.total_results / perPage
    );

    this.setCurrentPage(
      this.currentPage > newTotalPages ? newTotalPages : this.currentPage
    );

    this.loadUserAds(
      this.currentPage > newTotalPages ? newTotalPages : this.currentPage
    );
  };

  setIsLoading = (data) => {
    this.isLoading = data;
  };

  setSearchText = (data) => {
    this.searchText = data;
    this.setCurrentPage(1);
    this.loadUserAds();
  };

  setFilterData = (data) => {
    this.filterData = data;
  };

  setShowFilter = (data) => {
    this.showFilter = data;
  };

  setAdDataCreate = (data) => {
    this.adDataCreate = data;
  };

  setAdAdvacedSearchData = (data) => {
    this.adAdvacedSearchData = data;
  };

  loadAds = async (newPage) => {
    if (this.currentPageSite <= this.totalPagesSite) {
      const data = await adAction.getAllAds(newPage ?? this.currentPageSite);

      this.setSiteAds(
        this.currentPageSite === 1 ? data.ads : [...this.siteAds, ...data.ads]
      );

      this.setTotalPagesSite(data.totalPages);

      this.setTotalAdsSite(data.totalAds);

      this.setIsLoading(false);
    }
  };

  loadUserAds = async (newPage) => {
    this.setAds(
      await adAction.getUserAds(
        newPage ?? this.currentPage,
        this.perPage,
        this.searchText,
        this.filterData
      )
    );

    this.setIsLoading(false);
  };

  handlePageChange = (direction) => {
    const newPage =
      direction === "next" ? this.currentPage + 1 : this.currentPage - 1;
    this.setCurrentPage(newPage);
    this.loadUserAds();
  };

  handlePageClick = (page) => {
    this.setCurrentPage(page);
    this.loadUserAds();
  };

  searchAds = () => {
    this.setSearchText("");
    this.setCurrentPage(1);
    this.loadUserAds();
  };

  deleteAd = async (id) => {
    const response = await adAction.deleteAd(id);
    commonStore.setSuccessMessage(response.message);
  };

  clearFilterData = () => {
    this.filterData = {
      dateFrom: "",
      dateTo: "",
      status: "",
      field: "",
      employmentType: "",
      minSalary: "",
      maxSalary: "",
    };
  };
}

export default new Ad();
