# MYSQL 이미지 다운로드
docker pull mysql:latest

# MYSQL 프로세스 시작
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql:latest
