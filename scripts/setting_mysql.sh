# # MYSQL 이미지 다운로드
docker pull mysql:latest
# MYSQL 프로세스 시작
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql:latest

while ! docker exec mysql-container mysqladmin --user=root --password=1234 --host "127.0.0.1" ping --silent &> /dev/null ; do
    echo "Waiting for database connection..."
     sleep 2
done

docker exec -ti mysql-container sh -c "echo ""create database carrot"" | mysql -u root -p1234"
