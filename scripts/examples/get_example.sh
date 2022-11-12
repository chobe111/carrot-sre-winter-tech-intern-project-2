helpFunction()
{
   echo ""
   echo "Usage: $0 -d domain -o ownerId -r region"
   echo -e "\t-d Write Domain like (subnet, vpc)"
   echo -e "\t-o Write Amazon web services account Id"
   echo -e "\t-r Write AWS region name (ap-northeast-2, us-east-2, ...)"
   exit 1 # Exit script after printing help
}

while getopts "d:o:r:" opt
do
   case "$opt" in
      d ) domain="$OPTARG" ;;
      o ) ownerId="$OPTARG" ;;
      r ) region="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$domain" ] || [ -z "$ownerId" ] || [ -z "$region" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi


bodyData() 
{
cat << EOF 
{
  "ownerId": "$ownerId",
  "region": "$region"
}
EOF
}

curl -X GET "http://localhost:3000/carrot/v1/$domain" \
 -H "Content-type: application/json" \
 -d "$(bodyData)"



