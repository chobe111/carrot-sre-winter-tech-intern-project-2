# Karrot SRE Winter Tech Internship Project 2

![Untitled](https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd1e99fcb-48f7-4ad6-adc5-8d30e102844a%2F%25EB%25A9%2594%25EC%259D%25B8%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580.png&blockId=3cabbb83-ef9b-47bb-9dd7-70229c32a2a4)

# Description

본 레포지토리는 [2022 당근 마켓 WINTERTECH INTERNSHIP]의 **사이트 신뢰성 엔지니어(SRE)** 분야의 2번 과제를 구현한 결과물입니다.

**[NestJS](https://nestjs.com/)** 프레임워크를 사용해 REST API 서버를 구현했으며 특정 사용자가 **계정 정보**와 **리전 정보** 그리고 **필터링 정보**를 AWS 자원을 데이터베이스에 생성하고 데이터베이스에 존재하는 자원을 얻어 올 수 있도록 구현했습니다.

# Prerequisite

## Database

로컬 환경에 도커가 설치되어있어야합니다. [installation](https://docs.docker.com/engine/install/)

### 데이터베이스 정보

| Name        | Value     |
| ----------- | --------- |
| DB_PORT     | 3306      |
| DB_USERNAME | root      |
| DB_PASSWORD | 1234      |
| DB_NAME     | carrot    |
| DB_HOST     | localhost |

## Yarn

로컬 환경에 yarn 이 설치되어있어야합니다. [installation](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

# Installation

프로젝트 폴더의 script/start_server.sh 파일을 실행해 노드 패키지를 설치하고 MySQL 데이터베이스 프로세스를 실행합니다 이후 3000포트의 NestJS 서버를 실행합니다.

```bash
$ cd {project_folder}/scripts
$ chmod +x start_server.sh
$ ./start_server.sh
```

# Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

# Example

프로젝트 폴더의 **script/examples** 폴더안에 GET 과 POST 메서드를 테스트 할 수 있는 쉘 파일을 정의했습니다.

```bash
# 모든 AWS 자원을 데이터베이스에 저장하기
chmod +x {project_folder}/scripts/examples/post_example.sh

./post_example.sh -d $DOMAIN(vpc | subnet) -a $ACCESS_KEY_ID -s $SECRET_ACCESS_KEY -r $REGION

# 데이터베이스에 저장된 모든 AWS 리소스 가져오기
chmod +x {project_folder}/scripts/examples/get_example.sh

./get_example.sh -d $DOMAIN(vpc | subnet) -o $OWNER_ID -r $REGION
```

# API

문제에서 요구하는 각 리전에 해당하는 VPC 정보와 Subnet 정보를 가져오기 위한 API 를 정의했습니다.

## VPC 정보 생성하기

```bash
POST /carrot/v1/vpc
Host: localhost:3000
Content-Type: application/json;charset=utf-8
```

AWS API 를 통해 가져온 정보를 데이터베이스에 저장하고 Response 값을 반환합니다.

### Request

**Parameter (Request body)**

| Name   | Type                | Description                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------ |
| config | AWSInstanceConfig   | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| filter | DescribeVpcsRequest | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다.             |

### Response

**Parameter**

| Name      | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| vpcs      | Vpc[]  | 생성된 VPC 정보입니다.                       |
| nextToken | string | 다음 페이지 결과를 조회하기 위한 토큰입니다. |

### Example

```bash
curl -H "Content-Type: application/json" \
 -d '{"config": {
	 		"region":"$YOUR_REGION",
			"accessKeyId": "$YOUR_ACCESS_KEY_ID",
			"secretAccessKey":"$YOUR_SECRET_ACCESS_KEY"}}' \
-X POST "localhost:3000/carrot/v1/vpc" \
```

## VPC 정보 가져오기

```bash
GET /carrot/v1/vpc
Host: localhost:3000
Content-Type: application/json;charset=utf-8
```

데이터베이스에 저장되어 있는 VPC 정보를 가져옵니다.

### Request

**Parameter (Request body)**

| Name    | Type                     | Description                                                                                       |
| ------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| ownerId | string                   | AWS 계정 정보를 입력합니다                                                                        |
| filter  | DescribeCacheVpcsRequest | 데이터베이스에 저장되어있는 VPC 데티어중 특정 조건에 맞는 정보를 가져오기 위해 필요한 정보입니다. |
| region  | string                   | 특정 자원의 리전 정보입니다.                                                                      |

### Response

**Parameter**

| Name | Type  | Description                             |
| ---- | ----- | --------------------------------------- |
| vpcs | Vpc[] | 데이터베이스에 존재하는 VPC 정보입니다. |

### Example

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"ownerId":"$YOUR_OWNER_ID", "region": "$YOUR_REGION_NAME"}' \
 "localhost:3000/carrot/v1/vpc"
```

## SUBNET 정보 생성하기

```bash
POST /carrot/v1/subnet
Host: localhost:3000
Content-Type: application/json;charset=utf-8
```

### Request

**Parameter (Request body)**

| Name   | Type                   | Description                                                              |
| ------ | ---------------------- | ------------------------------------------------------------------------ |
| config | AWSInstanceConfig      | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| filter | DescribeSubnetsRequest | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다.             |

### Response

**Parameter**

| Name      | Type     | Description                                                              |
| --------- | -------- | ------------------------------------------------------------------------ |
| subnets   | Subnet[] | 특정 계정의 특정 리전에 대한 AWS API 객체 생성을 위해 필요한 정보입니다. |
| nextToken | string   | 특정 조건에 맞는 VPC 정보를 가져오기 위해 필요한 정보입니다.             |

### Example

```bash
curl - X POST \
 -H "Content-Type: application/json" \
 -H "Accept: application/json" \
 -d '{"config": {
	 		"region":"$YOUR_REGION",
			"accessKeyId": "$YOUR_ACCESS_KEY_ID",
			"secretAccessKey":"$YOUR_SECRET_ACCESS_KEY"}}'\
"localhost:3000/carrot/v1/subnet"
```

## SUBNET 정보 가져오기

```bash
GET /carrot/v1/subnet
Host: localhost:3000
Content-Type: application/json;charset=utf-8
```

데이터베이스에 저장되어 있는 SUBNET 정보를 가져옵니다.

### Request

**Parameter (Request body)**

| Name    | Type                        | Description                                                                                          |
| ------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| ownerId | string                      | AWS 계정 정보를 입력합니다                                                                           |
| filter  | DescribeCacheSubnetsRequest | 데이터베이스에 저장되어있는 Subnet 데티어중 특정 조건에 맞는 정보를 가져오기 위해 필요한 정보입니다. |
| region  | string                      | 특정 자원의 리전 정보입니다.                                                                         |

### Response

**Parameter**

| Name    | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| subnets | Subnet[] | 데이터베이스에 존재하는 Subnet 정보입니다. |

### Example

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"ownerId":"$YOUR_OWNER_ID", "region": "$YOUR_REGION_NAME"}' \
 "localhost:3000/carrot/v1/subnet"
```

# Type

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

# Database

AWS 공식 문서를 참고해 데이터베이스를 구성했습니다.

[KarrotEERDiagram.pdf](Karrot%20SRE%20Winter%20Tech%20Internship%20Project%202%2041d8e5f67a244f8b90e807ead25a963d/KarrotEERDiagram.pdf)

# Contact

- **Author** - Myungki Cho
- **Email** - chobe0719@gmail.com
