/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Party {
  /** @format int64 */
  id?: number;
  name?: string;
  symbol?: string;
}

export interface Constituency {
  /** @format int64 */
  id?: number;
  name?: string;
  state?: string;
}

export interface Candidate {
  /** @format int64 */
  id?: number;
  name?: string;
  party?: Party;
  constituency?: Constituency;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: FormData) =>
      (Array.from(input.keys()) || []).reduce((formData, key) => {
        const property = input.get(key);
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ScaleVote API
 * @version 1.0
 * @license Apache 2.0 (http://springdoc.org)
 * @baseUrl /
 *
 * API documentation for the ScaleVote project - A minimal election conducting system put up in Spring Boot for experimenting with scalability and real-time processing capabilities of Apache Kafka.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Political Parties
     * @name GetPartyById
     * @request GET:/api/parties/{id}
     */
    getPartyById: (id: number, params: RequestParams = {}) =>
      this.request<Party, any>({
        path: `/api/parties/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Political Parties
     * @name UpdateParty
     * @request PUT:/api/parties/{id}
     */
    updateParty: (id: number, data: Party, params: RequestParams = {}) =>
      this.request<Party, any>({
        path: `/api/parties/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Political Parties
     * @name DeleteParty
     * @request DELETE:/api/parties/{id}
     */
    deleteParty: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/parties/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Constituencies
     * @name GetConstituencyById
     * @request GET:/api/constituencies/{id}
     */
    getConstituencyById: (id: number, params: RequestParams = {}) =>
      this.request<Constituency, any>({
        path: `/api/constituencies/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Constituencies
     * @name UpdateConstituency
     * @request PUT:/api/constituencies/{id}
     */
    updateConstituency: (id: number, data: Constituency, params: RequestParams = {}) =>
      this.request<Constituency, any>({
        path: `/api/constituencies/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Constituencies
     * @name DeleteConstituency
     * @request DELETE:/api/constituencies/{id}
     */
    deleteConstituency: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/constituencies/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Candidates
     * @name GetCandidateById
     * @request GET:/api/candidates/{id}
     */
    getCandidateById: (id: number, params: RequestParams = {}) =>
      this.request<Candidate, any>({
        path: `/api/candidates/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Candidates
     * @name UpdateCandidate
     * @request PUT:/api/candidates/{id}
     */
    updateCandidate: (id: number, data: Candidate, params: RequestParams = {}) =>
      this.request<Candidate, any>({
        path: `/api/candidates/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Candidates
     * @name DeleteCandidate
     * @request DELETE:/api/candidates/{id}
     */
    deleteCandidate: (id: number, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/candidates/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vote
     * @name CastVote
     * @request POST:/api/votes/cast
     */
    castVote: (
      query: {
        voterName: string;
        /** @format int32 */
        age: number;
        /** @format int64 */
        candidateId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/votes/cast`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vote
     * @name BulkCastVotes
     * @request POST:/api/votes/bulk-cast
     */
    bulkCastVotes: (
      query: {
        /** @format int64 */
        constituencyId: number;
        /** @format int32 */
        numberOfVotes: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/votes/bulk-cast`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Political Parties
     * @name GetAllParties
     * @request GET:/api/parties
     */
    getAllParties: (params: RequestParams = {}) =>
      this.request<Party[], any>({
        path: `/api/parties`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Political Parties
     * @name CreateParty
     * @request POST:/api/parties
     */
    createParty: (data: Party, params: RequestParams = {}) =>
      this.request<Party, any>({
        path: `/api/parties`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fill Dummy Data / Reset System
     * @name ResetDummyData
     * @request POST:/api/dummy/reset-data
     */
    resetDummyData: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/dummy/reset-data`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Constituencies
     * @name GetAllConstituencies
     * @request GET:/api/constituencies
     */
    getAllConstituencies: (params: RequestParams = {}) =>
      this.request<Constituency[], any>({
        path: `/api/constituencies`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Constituencies
     * @name CreateConstituency
     * @request POST:/api/constituencies
     */
    createConstituency: (data: Constituency, params: RequestParams = {}) =>
      this.request<Constituency, any>({
        path: `/api/constituencies`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Candidates
     * @name GetAllCandidates
     * @request GET:/api/candidates
     */
    getAllCandidates: (params: RequestParams = {}) =>
      this.request<Candidate[], any>({
        path: `/api/candidates`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Candidates
     * @name CreateCandidate
     * @request POST:/api/candidates
     */
    createCandidate: (data: Candidate, params: RequestParams = {}) =>
      this.request<Candidate, any>({
        path: `/api/candidates`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Election Results
     * @name GetStateResults
     * @summary Fetch result per state
     * @request GET:/api/results/state/{state}
     */
    getStateResults: (state: string, params: RequestParams = {}) =>
      this.request<Record<string, object>, any>({
        path: `/api/results/state/${state}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Election Results
     * @name GetConstituencyResults
     * @request GET:/api/results/constituency/{constituencyId}
     */
    getConstituencyResults: (constituencyId: number, params: RequestParams = {}) =>
      this.request<Record<string, object>, any>({
        path: `/api/results/constituency/${constituencyId}`,
        method: "GET",
        ...params,
      }),
  };
}
