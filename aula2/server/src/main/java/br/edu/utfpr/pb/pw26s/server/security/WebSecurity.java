package br.edu.utfpr.pb.pw26s.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthUserService authUserService;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint( authenticationEntryPoint )
            .and()
            .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/users").permitAll()

                .anyRequest().authenticated()
            .and()
                // Filters
                .addFilter(
                        new JWTAuthenticationFilter(authenticationManager(),
                                getApplicationContext()))
                .addFilter(
                        new JWTAuthorizationFilter(authenticationManager(),
                                getApplicationContext())
                )
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService( userDetailsService() )
                .passwordEncoder( passwordEncoder() );
    }

    @Override
    @Bean
    public UserDetailsService userDetailsService() {
        return authUserService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(org.springframework.security.config.annotation.web.builders.WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/h2-console/**",
                        "/swagger-resources/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v2/api-docs",
                        "/webjars/**");
    }
}
