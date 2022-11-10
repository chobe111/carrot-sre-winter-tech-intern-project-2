# README

![Untitled](https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd1e99fcb-48f7-4ad6-adc5-8d30e102844a%2F%25EB%25A9%2594%25EC%259D%25B8%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580.png&blockId=3cabbb83-ef9b-47bb-9dd7-70229c32a2a4)

---

# Description

---

본 레포지토리는 **[2022 당근 마켓 WINTERTECH INTERNSHIP]** 의 **사이트 신뢰성 엔지니어(SRE)** 분야의 2번 과제를 구현한 결과물입니다.

NestJS 프레임워크를 사용해 구현했으며 특정 사용자가 **계정 정보**와 **리전 정보** 그리고 **필터링 정보**를 통해 원하는 값을 얻어 올 수록 구현했습니다.

또한 로컬 데이터베이스와 AWS 환경 정보의 동기화를 위한 API 를 구현했습니다. 현재는 AWS 환경정보를 기준으로 로컬 데이터베이스를 동기화 합니다.

일반적인 상황에서 사용자는 GET 메서드를 통해 로컬 혹은 글로벌 캐시 데이터베이스에서 인프라 정보를 가져오고 [Terraform](https://registry.terraform.io/) 등 IAC 정보의 변경이 생겼을 때 CACHE API 를 호출하여 캐시 데이터베이스의 정보를 동기화 합니다.

추후에는 개발자가 캐시 데이터베이스에 생성한 자원 정보를 AWS 환경 정보에 동기화하고 생성한 자원 정보에서 발생할 수 있는 보안 문제점들을 Notify 하는 API 도 개발 할 수 있을 것이라 생각합니다.

# Installation

---

```bash
$ yarn
```

# Running the app

---

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

# Prerequisite

---

로컬 환경에 도커가 설치있어야합니다. [installation](https://docs.docker.com/engine/install/)

도커를 설치한 이후 프로젝트 폴더의 sciprt/setting_mysql.sh 파일을 실행시킵니다.

```bash
./script/setting_mysql.sh
```

해당 쉘 스크립트를 실행시키면 로컬 환경에 MySQL 데이터베이스 프로세스가 실행됩니다.

# API

---

문제에서 요구하는 각 리전에 해당하는 VPC 정보와 Subnet 정보를 가져오기 위한 API 를 정의했습니다.

## VPC 정보 생성하기

```bash
POST /carrot/v1/vpc
Host: localhost
Content-type: application/json;charset=utf-8
```

AWS API 를 통해 가져온 정보를 데이터베이스에 저장하고 Response 값을 반환합니다.

### Request

**Parameter**

| Name   | Type                | Description                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| config | AWSInstanceConfig   | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| filter | DescribeVpcsRequest | undefined                                                                | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다. |

### Response

**Parameter**

| Name      | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| vpcs      | Vpc[]  | 생성된 VPC 정보입니다.                       |
| nextToken | string | 다음 페이지 결과를 조회하기 위한 토큰입니다. |

## VPC 정보 가져오기

```bash
GET /carrot/v1/vpc
Host: localhost
Content-type: application/json;charset=utf-8
```

데이터베이스에 저장되어 있는 VPC 정보를 가져옵니다.

### Request

**Parameter**

| Name       | Type                     | Description                |
| ---------- | ------------------------ | -------------------------- | ----------------------------------------------------------------------- |
| account_id | string                   | AWS 계정 정보를 입력합니다 |
| filter     | DescribeCacheVpcsRequest | undefined                  | 데이터베이스에 저장되어있는 VPC 정보를 가져오기 위해 필요한 정보입니다. |

### Response

**Parameter**

| Name | Type  | Description                             |
| ---- | ----- | --------------------------------------- |
| vpcs | Vpc[] | 데이터베이스에 존재하는 VPC 정보입니다. |

## SUBNET 정보 생성하기

```bash
POST /carrot/v1/subnet
Host: localhost
Content-type: application/json;charset=utf-8
```

### Request

**Parameter**

| Name   | Type                   | Description                                                              |
| ------ | ---------------------- | ------------------------------------------------------------------------ |
| config | AWSInstanceConfig      | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| filter | DescribeSubnetsRequest | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다.             |

### Response

**Parameter**

| Name      | Type     | Description                                                              |
| --------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| subnets   | Subnet[] | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| nextToken | string   | undefined                                                                | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다. |

## SUBNET 정보 가져오기

```bash
GET /carrot/v1/subnet
Host: localhost
Content-type: application/json;charset=utf-8
```

데이터베이스에 저장되어 있는 SUBNET 정보를 가져옵니다.

### Request

**Parameter**

| Name       | Type                        | Description                |
| ---------- | --------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| account_id | string                      | AWS 계정 정보를 입력합니다 |
| filter     | DescribeCacheSubnetsRequest | undefined                  | 데이터베이스에 저장되어있는 Subnet 정보를 가져오기 위해 필요한 정보입니다. |

### Response

**Parameter**

| Name    | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| subnets | Subnet[] | 데이터베이스에 존재하는 Subnet 정보입니다. |

## 데이터베이스 동기화 하기

```bash
POST /carrot/v1/cache/sync
Host: localhost
Content-type: application/json;charset=utf-8
```

AWS 환경에 맞추어 특정 계정의 데이터베이스 데이터를 동기화 합니다.

### Request

**Parameter**

| Name   | Type              | Description                                                              |
| ------ | ----------------- | ------------------------------------------------------------------------ |
| config | AWSInstanceConfig | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |

# Type

---

## AWSInstanceConfig

특정 계정의 특정 리전에 대한 AWS API 인스턴스를 생성하기 위해 필요한 정보입니다.

| Key             | Type   | Required |
| --------------- | ------ | -------- |
| region          | string | true     |
| accessKeyId     | string | true     |
| secretAccessKey | string | true     |

## DescribeVpcsRequest

AWS에 존재하고 특정 조건에 만족하는 Vpc 정보를 얻어오기 위해 사용하는 타입입니다.

| Key        | Type                   | Required |
| ---------- | ---------------------- | -------- |
| DryRun     | Boolean                | false    |
| Filters    | FilterList             | false    |
| VpcIds     | VpcIdStringList        | false    |
| NextToken  | String                 | false    |
| MaxResults | DescribeVpcsMaxResults | false    |

상세정보: [https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_DescribeVpcs.html#API_DescribeVpcs_RequestParameters](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_DescribeVpcs.html#API_DescribeVpcs_RequestParameters)

## DescribeSubnetsRequest

AWS에 존재하고 특정 조건에 만족하는 Subnet 정보를 얻어오기 위해 사용하는 타입입니다.

| Key        | Type                      | Required |
| ---------- | ------------------------- | -------- |
| DryRun     | Boolean                   | false    |
| Filters    | FilterList                | false    |
| SubnetIds  | SubnetIdStringList        | false    |
| NextToken  | String                    | false    |
| MaxResults | DescribeSubnetsMaxResults | false    |

상세정보: [https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_DescribeSubnets.html#API_DescribeSubnets_RequestParameters](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_DescribeSubnets.html#API_DescribeSubnets_RequestParameters)

## DescribeCacheVpcsRequest

데이터베이스에 존재하고 특정 조건에 만족하는 Vpc 정보를 얻어오기 위해 사용하는 타입입니다.

| Key    | Type            | Required |
| ------ | --------------- | -------- |
| VpcIds | VpcIdStringList | false    |

## DescribeCacheSubnetsRequest

데이터베이스에 존재하고 특정 조건에 만족하는 Subnet 정보를 얻어오기 위해 사용하는 타입입니다.

| Key       | Type               | Required |
| --------- | ------------------ | -------- |
| SubnetIds | SubnetIdStringList | false    |

## Vpc

상세정보: [https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_Vpc.html](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_Vpc.html)

## Subnet

상세정보: [https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_Subnet.html](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/APIReference/API_Subnet.html)

# Contact

---

- **Author** - Myungki Cho
- **Email** - chobe0719@gmail.com
