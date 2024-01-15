FROM molgenis/maven-jdk17
WORKDIR /opt/app
COPY target/test-0.0.1-SNAPSHOT.jar /test.jar
CMD ["java", "-jar", "/test.jar"]