# 첫 번째 단계: 소스 코드를 빌드하는 단계
FROM gradle:8.5.0-jdk17 AS builder

# 작업 디렉토리를 설정합니다
WORKDIR /app

# Gradle 의존성을 빌드합니다
COPY build.gradle .
COPY settings.gradle .
COPY gradle ./gradle
RUN gradle clean build --no-daemon

# 소스 코드를 복사합니다
COPY src ./src

# 애플리케이션을 빌드합니다
RUN gradle bootJar --no-daemon

# 두 번째 단계: 실행 가능한 JAR를 생성하는 단계
FROM openjdk:17-jdk-alpine

WORKDIR /app

# 첫 번째 단계에서 생성된 JAR 파일을 복사합니다
COPY --from=builder /app/build/libs/goodong-*.jar ./app.jar

# application.properties 파일을 복사합니다
COPY src/main/resources/application.properties ./application.properties

# 업로드 디렉토리를 생성합니다
RUN mkdir /uploads

# 포트를 노출합니다 (Spring Boot 기본 포트는 8000)
EXPOSE 8000

# 애플리케이션을 실행합니다
CMD ["java", "-jar", "./app.jar"]
