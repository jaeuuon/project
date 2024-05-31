package kr.jaeuuon.security.source.jwt.authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.jaeuuon.common.basic.source.code.impl.AuthorityCode;
import kr.jaeuuon.common.basic.source.util.Util;
import kr.jaeuuon.security.source.security.userdetails.impl.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        Long id = Util.getUserId(request);

        if (id != null) {
            setAuthentication(id, Util.getUserAuthorities(request));
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(long id, Set<AuthorityCode> authorities) {
        Collection<? extends GrantedAuthority> grantedAuthorities = authorities.stream().map(authority -> new SimpleGrantedAuthority(authority.name())).collect(Collectors.toSet());
        UserDetailsImpl userDetailsImpl = new UserDetailsImpl(id, grantedAuthorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetailsImpl, null, grantedAuthorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
