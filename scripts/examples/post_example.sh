helpFunction()
{
   echo ""
   echo "Usage: $0 -a accessKeyId -s secretAccessKey -r region"
   echo -e "\t-d Write Domain like (subnet, vpc)"
   echo -e "\t-a Write AWS account accessKeyId"
   echo -e "\t-s Write AWS account secretAccessKey"
   echo -e "\t-r Write AWS region name (ap-northeast-2, us-east-2, ...)"
   exit 1 # Exit script after printing help
}

while getopts "d:a:s:r:" opt
do
   case "$opt" in
     d ) domain="$OPTARG" ;;
	  a ) accessKeyId="$OPTARG" ;;
	  s ) secretAccessKey="$OPTARG" ;;
	  r ) region="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$domain"] ||[ -z "$accessKeyId" ] || [ -z "$secretAccessKey" ] || [ -z "$region"]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi


bodyData() 
{
cat << EOF
{
  "config": {
    "region": "$region",
    "accessKeyId": "$accessKeyId",
    "secretAccessKey": "$secretAccessKey"
    }
}
EOF
}

curl -H "Content-type: application/json" \
 -d "$(bodyData)" \
-X POST "http://localhost:3000/carrot/v1/$domain"


