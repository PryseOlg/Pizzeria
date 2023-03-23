FROM openjdk:17-alpine
COPY . /src
WORKDIR /src
COPY target/*.jar app.jar
EXPOSE 8000
ENTRYPOINT ["java", "-jar", "app.jar"]